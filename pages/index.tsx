"use client";
import * as React from "react";
import PageTemplate from "../components/templates/pagetemplate";
import Schedule from "../components/organisms/schedule";
import dynamic from "next/dynamic";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Title from "@/components/atoms/title";
import { useState, useEffect } from 'react';
import SearchResults from "./searchresults";



const HomePage = () => {
  const { user, error, isLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);


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
