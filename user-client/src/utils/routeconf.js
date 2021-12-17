import { useNavigate, useParams } from 'react-router-dom';

export function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
};

export function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}