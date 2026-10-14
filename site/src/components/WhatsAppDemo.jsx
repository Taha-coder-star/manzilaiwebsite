import { agencyName } from "../data/demo";
import logoDark from "../assets/manzil-mark-dark.svg";
import { Back, Video, Call, MoreDots, Emoji, Clip, Camera, Mic, Ticks } from "./Icons";
import "../styles/WhatsAppDemo.css";

function Message({ message }) {
  const outgoing = message.type === "in"; // the customer's bubbles sit on the right
  const { listing } = message;
  const meta = (
    <span className="meta">
      {message.time}
      {outgoing && <Ticks />}
    </span>
  );

  return (
    <div className={`msg ${outgoing ? "msg--in" : "msg--bot"}${listing ? " msg--card" : ""}`}>
      {/* plain bubbles: the timestamp floats inside the text block */}
      <p>
        {message.text}
        {!listing && meta}
      </p>
      {listing && (
        <>
          <div className="listing">
            <img className="listing__img" src={listing.image} alt="" width="320" height="142" />
            <div className="listing__text">
              <span className="price">{listing.price}</span>
              <strong>{listing.title}</strong>
              <span className="area">{listing.area}</span>
            </div>
          </div>
          {meta}
        </>
      )}
    </div>
  );
}

/**
 * WhatsApp-style phone. Purely visual: the header icons and message bar are not
 * connected to messaging, calls or the microphone.
 */
export default function WhatsAppDemo({ messages, typing }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        <div className="wa__head">
          <Back />
          <span className="wa__logo"><img src={logoDark} alt="" width="14" height="17" /></span>
          <span className="wa__who">
            <strong>{agencyName}</strong>
            <small>{typing ? "typing…" : "online"}</small>
          </span>
          <span className="wa__tools" aria-hidden="true">
            <Video /><Call /><MoreDots />
          </span>
        </div>

        <div className="wa__chat" role="log" aria-live="off" aria-label="Sample WhatsApp conversation">
          <span className="wa__day">Today</span>
          {messages.map((m) => <Message key={m.id} message={m} />)}
          {typing && (
            <div className="msg msg--bot msg--typing" aria-hidden="true"><i /><i /><i /></div>
          )}
        </div>

        <div className="wa__bar" aria-hidden="true">
          <span className="wa__field">
            <Emoji /><em>Message</em><Clip /><Camera />
          </span>
          <span className="wa__mic"><Mic /></span>
        </div>
      </div>
    </div>
  );
}
