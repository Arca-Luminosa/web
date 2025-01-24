"use client"
import { Button, Heading, Text } from "@medusajs/ui"
import { PencilSquare as Edit, Plus, Trash, Spinner } from "@medusajs/icons"
import { useEffect, useState, useActionState } from "react";

import useToggleState from "@lib/hooks/use-toggle-state"
import Input from "@modules/common/components/input"
import CheckboxWithLabel from "@modules/common/components/checkbox";
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { addPaymentSource, deletePaymentSource } from "@lib/data/payment-sources"
import { getAcceptanceTokens } from "@lib/services/wompi";
import { PaymentSourceData } from "@lib/services/wompi.types";

const PaymentSource = ({ email, savedPaymentSource }: { email: string, savedPaymentSource?: PaymentSourceData }) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)
	const [removing, setRemoving] = useState(false)
	const [acceptanceDocument, setAcceptanceDocument] = useState<string | undefined>(undefined)
	const [acceptanceToken, setAcceptanceToken] = useState<string | undefined>(undefined)
	const [personalDataAuthDocument, setPersonalDataAuthDocument] = useState<string | undefined>(undefined)
	const [acceptPersonalAuth, setAcceptPersonalAuth] = useState<string | undefined>(undefined)
	const [hasReadRules, setHasReadRules] = useState(false)
	const [hasAcceptedDataManagement, setHasAcceptedDataManagement] = useState(false)

	const [paymentSource, setPaymentSource] = useState(savedPaymentSource)

  const [formState, formAction] = useActionState(addPaymentSource, {
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
		setAcceptanceDocument(undefined)
		setAcceptanceToken(undefined)
		setPersonalDataAuthDocument(undefined)
		setAcceptPersonalAuth(undefined)
		setHasReadRules(false)
		setHasAcceptedDataManagement(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
			setPaymentSource(formState.data)
    }
  }, [formState])

	useEffect(() => {
		const getPresignedTokens = async () => {
			const { presigned_acceptance, presigned_personal_data_auth } = await getAcceptanceTokens()
			setAcceptanceDocument(presigned_acceptance.permalink)
			setAcceptanceToken(presigned_acceptance.acceptance_token)
			setPersonalDataAuthDocument(presigned_personal_data_auth.permalink)
			setAcceptPersonalAuth(presigned_personal_data_auth.acceptance_token)
		}
		if (state) {
			getPresignedTokens()
		}
	}, [state, formState.error])

	const removePaymentSource = async () => {
		setRemoving(true)
		const dp = await deletePaymentSource()
		console.log(dp)
		setRemoving(false)
		setPaymentSource(undefined)
	}

  return (
    <>
      {!savedPaymentSource &&<button
        className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
      >
				<span className="text-base-semi">Add a payment source</span>
        <Plus />
      </button>}

			{savedPaymentSource && <div
				className="border rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors"
			>
				<div className="flex flex-col">
					<Heading
						className="text-left text-base-semi"
					>
						{savedPaymentSource.public_data.card_holder}
					</Heading>
					<Text className="flex flex-col text-left text-base-regular mt-2">
						<span>XXXXXXXXXXXX<b>{savedPaymentSource.public_data.last_four}</b></span>
					</Text>
				</div>
				<div className="flex items-center gap-x-4">
					<button
						className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
						onClick={open}
					>
						<Edit />
						Edit
					</button>
					<button
						className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
						onClick={removePaymentSource}
					>
						{removing ? <Spinner /> : <Trash />}
						Remove
					</button>
				</div>
			</div>}

      <Modal isOpen={state} close={close} data-testid="add-payment-source-modal">
        <Modal.Title>
          <Heading className="mb-2">Add payment source</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
							<Input
								label="Card holder's name"
								name="card_holder"
								required
								data-testid="card-holder-input"
							/>
							<Input
								label="Card number"
								name="number"
								required
								data-testid="card-number-input"
							/>
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="Expiration month"
                  name="exp_month"
									pattern="\d{2}"
                  required
                  data-testid="exp-month-input"
                />
                <Input
                  label="Expiration year"
                  name="exp_year"
									pattern="\d{2}"
                  required
                  data-testid="exp-year-input"
                />
								<Input
									label="CVC"
									name="cvc"
									pattern="\d{3,4}"
									required
									data-testid="cvc-input"
								/>
              </div>
							<CheckboxWithLabel
								label={<>Acepto haber leido los <a className="underline"
								href={acceptanceDocument}target="_blank">reglamentos y la política de privacidad</a> para hacer este pago</>}
								checked={hasReadRules}
								onChange={() => setHasReadRules((value) => !value)}
							/>
							<input
								type="hidden"
								value={acceptanceToken}
								name="acceptance_token"
								required/>
							<CheckboxWithLabel
								label={<>Acepto la <a className="underline" href={personalDataAuthDocument} target="_blank">autorización para la administración de datos personales</a></>}
								checked={hasAcceptedDataManagement}
								onChange={() => setHasAcceptedDataManagement((value) => !value)}
							/>
							<input
								type="hidden"
								value={acceptPersonalAuth}
								name="accept_personal_auth"
								required />
							<input
								type="hidden"
								value={email}
								name="customer_email"
								required />
            </div>
            {formState.error && (
              <div
                className="text-rose-500 text-small-regular py-2"
                data-testid="payment-source-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton disabled={!(hasReadRules && hasAcceptedDataManagement)} data-testid="save-button">Save</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default PaymentSource
