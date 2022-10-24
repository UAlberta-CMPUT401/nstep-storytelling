import path from 'path';
import { forms } from '@googleapis/forms';
import { authenticate } from '@google-cloud/local-auth';

async function createForm(query) {
  const authClient = await authenticate({
    keyfilePath: path.join(__dirname, 'nstep-storytelling-b013cf86302f.json'),
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  const gforms = forms({
    version: 'v1',
    auth: authClient,
  });
  const newForm = {
    info: {
      title: 'Creating a new form in Node',
    },
  };
  const res = await gforms.forms.create({
    requestBody: newForm,
  });
    console.log(res.data);
  return res.data;
}

if (module === require.main) {
  createForm().catch(console.error);
}
export { createForm };