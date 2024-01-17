import { useQuery } from "@apollo/client";
import Header from '../components/Header';
import { GET_ME } from "../graphql/queries/userQueries";

const Home = () => {
    const { loading } = useQuery(GET_ME, {
        onCompleted(data) {
            console.log(data);
        },
        // onError(err) {
        //     console.log(err.graphQLErrors);
        //     // console.log(err.networkError);
        // }
    })

    return (
        <Header />
    )
}

export default Home
