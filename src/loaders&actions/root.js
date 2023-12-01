// rrd imports
import { redirect } from "react-router-dom";

// helper functions
import { createContact, getContacts } from "../contacts";

// other libraries
import localforage from "localforage";
import sortBy from "sort-by";

// loader
export async function rootLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

// action
export async function rootAction({ request }) {
  const formData = await request.formData();
  const { intent, ...values } = Object.fromEntries(formData);

  switch (intent) {
    // Create a new contact
    case "newContact":
      try {
        const contact = await createContact();
        return redirect(`/contact/${contact.id}/edit`);
      } catch (error) {
        throw new Error("There was a problem creating new contact.");
      }

    // Generate Random Contacts
    case "genRandomContacts":
      try {
        const res = await fetch(`https://dummyjson.com/users?limit=10&skip=${Math.floor(Math.random() * 91)}`);
        if (!res.ok) {
          throw new Error("Network response was not OK.");
        }
        const users = await res.json();

        const contacts = [];
        users.users.map((user) => {
          const newContact = {
            id: Math.random().toString(36).substring(2, 9),
            createdAt: Date.now(),
            first: user.firstName,
            last: user.lastName,
            twitter: `@${user.username}`,
            avatar: user.image,
          };
          contacts.push(newContact);
        });
        return await localforage.setItem("contacts", contacts.sort(sortBy("last", "createdAt")));
      } catch (error) {
        throw new Error("There was a problem generating random contacts.");
      }
  }
}
