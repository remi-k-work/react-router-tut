// rrd imports
import { Form, useLoaderData } from "react-router-dom";

// components
import Favorite from "../components/Favorite";

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        {contact.file?.size > 0 ? (
          // Choose the local avatar if provided
          <img key={contact.id} src={URL.createObjectURL(contact.file)} />
        ) : (
          // Otherwise use the global avatar's url
          <img key={contact.id} src={contact.avatar || null} />
        )}
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
