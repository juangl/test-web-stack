import Head from "next/head";
import { ALL_USERS_QUERY, getInitialPaginationVariables, UserList } from "../components/userList";
import { initializeApollo } from "../lib/apollo";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Superformula - User List</title>
        <meta name="description" content="Superformula User List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>User List</h1>

        <form>
          <input placeholder="Search..." />
        </form>
      </header>

      <main>
        <UserList />
      </main>

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_USERS_QUERY,
    variables: getInitialPaginationVariables(Number(context.query.page)),
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
