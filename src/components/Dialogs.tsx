import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CloseIcon } from '../icons'

type DialogProps = { open: boolean; onClose: () => void }

export function RequestAccessDialog({ open, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function close() {
    setError('')
    setSubmitted(false)
    onClose()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid work email address.')
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }
    if (!role) {
      setError('Select your role so we can tailor the product tour.')
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="access-title"
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClose={onClose}
    >
      <div className="modal-heading">
        <div>
          <p>Private product preview</p>
          <h2 id="access-title">Request access</h2>
        </div>
        <button className="icon-button" type="button" aria-label="Close request access dialog" onClick={close}>
          <CloseIcon />
        </button>
      </div>

      {submitted ? (
        <div className="success-state" role="status">
          <span aria-hidden="true">✓</span>
          <h3>You’re on the list.</h3>
          <p>We saved this demo request locally. In a production build, it would be sent to the sales workspace.</p>
          <button className="button button-primary" type="button" onClick={close}>Done</button>
        </div>
      ) : (
        <form className="access-form" noValidate onSubmit={handleSubmit}>
          <p>See how Cairn explains forecast movement and turns risk signals into next actions.</p>
          {error ? <div ref={errorRef} className="error-summary" role="alert" tabIndex={-1}>{error}</div> : null}
          <label htmlFor="access-email">Work email</label>
          <input
            id="access-email"
            type="email"
            autoComplete="email"
            value={email}
            aria-invalid={Boolean(error && (!email.includes('@') || !email.trim()))}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="access-role">Role</label>
          <select id="access-role" value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">Select a role</option>
            <option>Sales leadership</option>
            <option>Revenue operations</option>
            <option>Frontline manager</option>
          </select>
          <button className="button button-primary" type="submit">Request the preview</button>
          <p className="form-note">No calls required. Product access and follow-up are handled asynchronously.</p>
        </form>
      )}
    </dialog>
  )
}

export function ProductTourDialog({ open, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [step, setStep] = useState(0)
  const steps = [
    ['Signals in one timeline', 'Calls, email, CRM activity, and buying intent arrive in one evidence trail.'],
    ['Risk explained', 'Cairn shows why confidence changed instead of returning an unexplained score.'],
    ['Next action attached', 'Every recommendation links back to the signal that created it.'],
  ]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function close() {
    setStep(0)
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal tour-modal"
      aria-labelledby="tour-title"
      onCancel={(event) => { event.preventDefault(); close() }}
      onClose={onClose}
    >
      <div className="modal-heading">
        <div>
          <p>90-second product tour</p>
          <h2 id="tour-title">From activity to action</h2>
        </div>
        <button className="icon-button" type="button" aria-label="Close product tour" onClick={close}><CloseIcon /></button>
      </div>
      <div className="tour-stage" aria-live="polite">
        <span className="tour-index" aria-hidden="true">0{step + 1}</span>
        <h3>{steps[step]?.[0]}</h3>
        <p>{steps[step]?.[1]}</p>
      </div>
      <div className="tour-controls">
        <p>Step {step + 1} of {steps.length}</p>
        <div>
          <button className="button button-secondary" type="button" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>Previous</button>
          {step < steps.length - 1 ? (
            <button className="button button-primary" type="button" onClick={() => setStep((value) => value + 1)}>Next</button>
          ) : (
            <button className="button button-primary" type="button" onClick={close}>Finish tour</button>
          )}
        </div>
      </div>
    </dialog>
  )
}
