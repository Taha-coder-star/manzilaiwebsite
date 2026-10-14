import { sidebar, leads, statusLabels, activeLeadId } from "../data/demo";
import logoLight from "../assets/manzil-mark-light.svg";
import { ChatTab, HomeTab, PeopleTab, Bell } from "./Icons";
import "../styles/DashboardPreview.css";

function SidebarList({ items }) {
  return (
    <ul className="app__list">
      {items.map((item) => (
        <li key={item.id} className={item.active ? "is-live" : undefined}>
          <span>{item.label}</span>
          <b>{item.count}</b>
        </li>
      ))}
    </ul>
  );
}

/**
 * Supporting dashboard context for the hero illustration (fictional sample data).
 * The lead whose chat is playing highlights as the conversation starts and moves to
 * "Viewing requested" when the customer asks about Saturday.
 */
export default function DashboardPreview({ leadActive, viewing }) {
  return (
    <div className="app" aria-hidden="true">
      <div className="app__top">
        <img src={logoLight} alt="" width="20" height="25" />
        <span className="app__tab is-on"><ChatTab /></span>
        <span className="app__tab"><HomeTab /></span>
        <span className="app__tab app__tab--line"><PeopleTab /></span>
        <span className="app__spacer" />
        <span className="app__bell"><Bell /></span>
        <span className="app__me">MD</span>
      </div>

      <div className="app__body">
        <aside className="app__side">
          <p className="app__h">Inbox</p>
          <SidebarList items={sidebar.inbox} />
          <p className="app__label">Team</p>
          <SidebarList items={sidebar.team} />
        </aside>
        <div className="app__main" />
      </div>

      <div className="leads">
        <p className="app__h app__h--main">Today's leads</p>
        <ul className="leads__list">
          {leads.map((lead) => {
            const isActive = lead.id === activeLeadId;
            const status = isActive && viewing ? "viewing" : lead.status;
            return (
              <li key={lead.id} className={`lead${isActive && leadActive ? " is-active" : ""}`}>
                <span className="lead__av">{lead.initials}</span>
                <span className="lead__body">
                  <strong>{lead.name}</strong>
                  <span>{lead.requirement}</span>
                </span>
                <em className={`chip chip--${status}`}>{statusLabels[status]}</em>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
