import FormularioContato from "../componentes/FormularioContato";

export default function ContatoPage() {
  return (
    <main className="contact-page">
      <section className="contact-card">
        <p className="section-kicker">Vamos conversar</p>
        <h1>Contato</h1>
        <p>Preencha o formulário para enviar uma mensagem.</p>
        <FormularioContato />
      </section>
    </main>
  );
}
