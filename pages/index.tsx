import Head from "next/head";
import {
  ALL_USERS_QUERY,
  UserList,
} from "../components/userList";
import { initializeApollo } from "../lib/apollo";
import { GetServerSidePropsContext } from "next";
import SearchInput from "../components/searchInput";
import { useRouter } from "next/router";
import { getInitialPaginationVariables } from "../lib/paginationUtils";

export default function Home() {
  const router = useRouter();
  const currentSearch = decodeURIComponent((router.query.search || "") as string);
  return (
    <div>
      <Head>
        <title>Superformula - User List</title>
        <meta name="description" content="Superformula User List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>User List</h1>

        <SearchInput initialSearch={currentSearch} />
      </header>

      <main>
        <UserList key={currentSearch} search={currentSearch} />
      </main>

      <footer>
        Made with 💜 by <a href="https://github.com/juangl">@juangl</a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  // get GraphQL data for SSR
  await apolloClient.query({
    query: ALL_USERS_QUERY,
    variables: getInitialPaginationVariables(
      context.query.page && Number(context.query.page),
      decodeURIComponent(context.query.search as string || ""),
    ),
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
