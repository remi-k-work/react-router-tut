// rrd imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// *** Layouts ***
import Root from "./layouts/Root";

// *** Pages ***
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import EditContact from "./pages/EditContact";
import Error from "./pages/Error";

// *** Loaders & Actions ***
import { rootLoader, rootAction } from "./loaders&actions/root";
import { contactLoader, favoriteContactAction, editContactAction, destroyContactAction } from "./loaders&actions/contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} loader={rootLoader} action={rootAction} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Index />} />
        <Route path="contact/:contactId" element={<Contact />} loader={contactLoader} action={favoriteContactAction} />
        <Route path="contact/:contactId/edit" element={<EditContact />} loader={contactLoader} action={editContactAction} />
        <Route path="contact/:contactId/destroy" element={null} action={destroyContactAction} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
