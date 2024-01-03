import { useQuery } from "@apollo/client";
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

    return (<>
        {loading && <p>Loading...</p>}
        </>
    )
}

export default Home
