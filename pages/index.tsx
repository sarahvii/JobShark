import * as React from "react";
import PageTemplate from "../components/templates/pagetemplate";
import Schedule from "../components/organisms/schedule";
import dynamic from "next/dynamic";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Title from "@/components/atoms/title";
import { useState, useEffect } from "react";
import SearchResults from "./searchresults";
import useApi from "@/services/useApi";
import postApi from "@/services/postApi";

const HomePage = () => {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [response, setResponse] = useState(null);
    console.log(user);

    useEffect(() => {
        console.log("index.tsx: useEffect[user]")
        const fetchData = async () => {
            const { response } = await useApi("api/my/getuser", {
                headers: { sid: user?.sid },
            });
            setResponse(response);
        };

        setIsLoggedIn(!!user);
        fetchData();
    }, [user]);

    useEffect(() => {
        console.log("index.tsx: useEffect[response]")
        if (!response && user) {
            console.log("in if")
            const userToPost = JSON.stringify({
                sid: user?.sid,
                email: user?.email,
                display_name: user?.name,
                location: null,
                industry: null
            });

            postApi("api/my/createuser", { body: userToPost });
        } else {
            console.log(response)
        }
    }, [response]);

    return (
        <>
            <PageTemplate>
                <div className="container mx-auto"></div>
                {isLoggedIn ? (
                    <>
                        <h3 className="text-center text-jaws-blue">
                            Welcome to JobShark, {user?.name}
                        </h3>
                    </>
                ) : (
                    <a href="/api/auth/login"></a>
                )}
                <Title text="My Schedule" />
                {/* <SearchResults job={job}/> */}
                <Schedule />
            </PageTemplate>
        </>
    );
};

export default HomePage;

export const getServerSideProps = withPageAuthRequired();
