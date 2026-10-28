export default function Secao({ titulo, children, className = "", id }) {
  return (
    <section className={`secao ${className}`.trim()} id={id}>
      <div className="secao-header">
        <span className="section-kicker">Portfolio</span>
        <h3>{titulo}</h3>
      </div>
      {children}
    </section>
  );
}