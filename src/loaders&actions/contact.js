// rrd imports
import { redirect } from "react-router-dom";

// helper functions
import { getContact, updateContact, deleteContact } from "../contacts";

// loader
export async function contactLoader({ params }) {
  let contact;
  try {
    contact = await getContact(params.contactId);
  } catch (error) {
    // Whenever you have an expected error case in a loader or action–like the data not existing–you can throw. The call stack will break, React Router will
    // catch it, and the error path is rendered instead. We won't even try to render a null contact.
    // Instead of hitting a render error with Cannot read properties of null, we avoid the component completely and render the error path instead, telling the
    // user something more specific. This keeps your happy paths, happy. Your route elements don't need to concern themselves with error and loading states.
    throw new Error("The contact was not found!");
  }
  return { contact };
}

// action
export async function favoriteContactAction({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// action
export async function editContactAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // If there is a remote avatar provided, erase the local one
  const { avatar, file } = updates;
  if (avatar) {
    updates.file = null;
  } else {
    if (file.size === 0) {
      // Do not save or overwrite the local avatar if nothing is being uploaded
      delete updates.file;
    }
  }

  await updateContact(params.contactId, updates);
  return redirect(`/contact/${params.contactId}`);
}

// action
export async function destroyContactAction({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
