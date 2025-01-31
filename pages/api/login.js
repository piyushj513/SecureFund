import connect from '../../lib/mongodb';
import User from '../../model/schema';

connect();

export default async function handler(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ status: 'Invalid username or password!' });
  } else {
    return res.json({ status: 'success', redirectUrl: '/main' });
  }
}
