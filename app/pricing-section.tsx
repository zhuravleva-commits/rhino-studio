const prices = [
  {
    label: 'сайты',
    title: 'Лендинг',
    price: '70 000',
    description: 'Структура, дизайн, адаптивная сборка и запуск.',
  },
  {
    label: 'продукты',
    title: 'Веб-приложение',
    price: '100 000',
    description: 'Первая рабочая версия с ключевым пользовательским сценарием.',
  },
  {
    label: 'telegram',
    title: 'Telegram-бот',
    price: '40 000',
    description: 'Основной сценарий, заявки и базовая интеграция.',
  },
  {
    label: 'telegram',
    title: 'Mini App',
    price: '60 000',
    description: 'Интерфейс внутри Telegram, логика и базовый backend.',
  },
];

export function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-shell">
        <div aria-hidden="true" className="pricing-shell__glow" />

        <div className="pricing-heading">
          <div>
            <p className="pricing-eyebrow">Стоимость</p>
            <h2>Понятная точка старта</h2>
          </div>

          <p className="pricing-heading__copy">
            Начинаем с необходимого, запускаем первую версию и развиваем
            продукт по мере роста задачи.
          </p>
        </div>

        <div className="pricing-grid">
          {prices.map((item, index) => (
            <article className="pricing-card" key={item.title}>
              <div className="pricing-card__topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
              </div>

              <h3>{item.title}</h3>
              <p className="pricing-card__description">{item.description}</p>

              <p className="pricing-card__price">
                <span className="pricing-card__from">от</span>
                <strong>{item.price}</strong>
                <span className="pricing-card__currency">₽</span>
              </p>
            </article>
          ))}
        </div>

        <div className="pricing-footer">
          <p>
            Финальная стоимость зависит от количества экранов, сценариев и
            интеграций. AI-системы и нестандартные задачи оцениваем после
            короткого брифа.
          </p>

          <a href="mailto:hello@rhino.studio">
            Обсудить проект <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
