// react
import { useRef } from "react";

// rrd imports
import { Form, useLoaderData, useNavigate } from "react-router-dom";

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  const avatarRef = useRef();

  function handleFileChange(ev) {
    // Make sure to limit the size of an avatar before its upload
    const fileInputAvatar = ev.currentTarget;
    const files = fileInputAvatar.files;

    // If there is (at least) one file selected
    if (files.length > 0) {
      if (files[0].size > 75 * 1024) {
        // Check the constraint
        fileInputAvatar.setCustomValidity("The selected file must not be larger than 75 kB");
        return;
      }
    }
    // No custom constraint violation
    fileInputAvatar.setCustomValidity("");

    // The local avatar has been provided; remove the remote one
    avatarRef.current.value = null;
  }

  return (
    <Form method="post" id="contact-form" encType="multipart/form-data">
      <p>
        <span>Name</span>
        <input placeholder="First" aria-label="First name" type="text" name="first" defaultValue={contact.first} />
        <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" defaultValue={contact.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        {contact.file?.size > 0 ? (
          // Choose the local avatar if provided
          <input ref={avatarRef} placeholder="https://example.com/avatar.jpg" aria-label="Avatar URL" type="url" name="avatar" defaultValue={null} />
        ) : (
          // Otherwise use the global avatar's url
          <input ref={avatarRef} placeholder="https://example.com/avatar.jpg" aria-label="Avatar URL" type="url" name="avatar" defaultValue={contact.avatar} />
        )}
      </label>
      <label>
        <span>Upload Avatar</span>
        <input type="file" name="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={(ev) => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
