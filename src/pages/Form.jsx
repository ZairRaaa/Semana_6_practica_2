import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Form() {
  const [params] = useSearchParams();
  const [values, setValues] = useState({ name: '', email: '', subject: params.get('producto') ?? '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  function change(event) {
    const { name, value, checked, type } = event.target;
    setValues(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors(current => ({ ...current, [name]: '' }));
    setSubmitted(false);
  }
  function submit(event) {
    event.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Escribe tu nombre (al menos 2 caracteres).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Escribe un correo válido.';
    if (values.subject.trim().length < 3) next.subject = 'Indica el motivo de tu consulta.';
    if (values.message.trim().length < 10) next.message = 'Cuéntanos un poco más (al menos 10 caracteres).';
    if (!values.consent) next.consent = 'Confirma que conoces el funcionamiento de esta demostración.';
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
    if (Object.keys(next).length) event.currentTarget.elements.namedItem(Object.keys(next)[0]).focus();
  }
  return <>
    <section className="page-heading"><p className="eyebrow">CONVERSEMOS</p><h1>Los detalles empiezan contigo.</h1><p>Cuéntanos qué producto te interesa o en qué podemos orientarte.</p></section>
    <div className="contact-grid"><aside className="contact-aside"><span className="contact-symbol">✳</span><h2>Un espacio para tus ideas.</h2><p>Incluye el nombre del producto y cualquier detalle que nos ayude a entender tu consulta.</p><hr /><p>Este formulario es una demostración: valida tus datos y muestra una confirmación local. No envía ni almacena información.</p></aside>
      <form onSubmit={submit} noValidate className="contact-form">
        <div className="form-row">{[['name', 'Tu nombre', 'text', '¿Cómo te llamas?', 80], ['email', 'Correo electrónico', 'email', 'nombre@ejemplo.com', 120]].map(([name, label, type, placeholder, maxLength]) => <label key={name} htmlFor={name}>{label}<input id={name} name={name} type={type} autoComplete={name === 'name' ? 'name' : 'email'} value={values[name]} onChange={change} placeholder={placeholder} maxLength={maxLength} required aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <span id={`${name}-error`} className="field-error">{errors[name]}</span>}</label>)}</div>
        <label htmlFor="subject">¿Sobre qué quieres consultar?<input id="subject" name="subject" value={values.subject} onChange={change} placeholder="Producto o motivo de la consulta" maxLength={150} required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} />{errors.subject && <span className="field-error" id="subject-error">{errors.subject}</span>}</label>
        <label htmlFor="message">Tu mensaje<textarea id="message" name="message" rows={5} value={values.message} onChange={change} placeholder="Me gustaría saber más sobre…" maxLength={1500} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <span id="message-error" className="field-error">{errors.message}</span>}</label>
        <label className="checkbox"><input name="consent" type="checkbox" checked={values.consent} onChange={change} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} />Entiendo que esta consulta es una demostración local.</label>{errors.consent && <span id="consent-error" className="field-error">{errors.consent}</span>}
        <button className="button" type="submit">Validar mi consulta ↗</button>
        {submitted && <div className="success" role="status"><strong>Tu consulta está lista, {values.name.trim()}.</strong><p>La información es válida. No se ha enviado a ningún destinatario.</p></div>}
      </form>
    </div>
  </>;
}
