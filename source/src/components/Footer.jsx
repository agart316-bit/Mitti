// Cellar footer shared by Home and Mix. Address, hours, phone, email and handle are placeholders until the bar details are final.
export default function Footer({ base }) {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-top">
          <a className="ft-mark" href={`${base}index.html`}>
            mitti
          </a>
          <div className="ft-cols">
            <p>118 Mercer Street<br />New York, NY 10012</p>
            <p>Tue to Sun<br />5 PM to 1 AM</p>
            <p>
              <a href="tel:+12125550142">(212) 555-0142</a><br />
              <a className="em" href="mailto:hello@mittinyc.com">hello@mittinyc.com</a><br />
              <a href="https://www.instagram.com/mittinyc" target="_blank" rel="noopener noreferrer">@mittinyc</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
