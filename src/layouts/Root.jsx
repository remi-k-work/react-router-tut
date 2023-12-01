// react
import { useEffect } from "react";

// rrd imports
import { Outlet, useLoaderData, Form, NavLink, useNavigation, useSubmit } from "react-router-dom";

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
  const isNewContactSubm = navigation.state === "submitting" && navigation.formData?.get("intent") === "newContact";
  const isGenRandomContactsSubm = navigation.state === "submitting" && navigation.formData?.get("intent") === "genRandomContacts";

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(ev) => {
                const isFirstSearch = q == null;
                submit(ev.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit" name="intent" value={"newContact"} disabled={isNewContactSubm}>
              New
            </button>
          </Form>
        </div>
        <div>
          <Form method="post">
            <button type="submit" name="intent" value={"genRandomContacts"} disabled={isGenRandomContactsSubm}>
              {isGenRandomContactsSubm ? <>Please wait...</> : <>Generate Random Contacts</>}
            </button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contact/${contact.id}`} className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}
