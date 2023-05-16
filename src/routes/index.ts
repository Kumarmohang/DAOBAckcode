import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';
import ProposalRoute from './proposals.route';
const ALL_REGISTERED_ROUTES = [new IndexRoute(), new UsersRoute(), new AuthRoute(), new ProposalRoute()];

export default ALL_REGISTERED_ROUTES;
