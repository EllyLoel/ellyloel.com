import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Link as RadixLink } from "@radix-ui/react-navigation-menu";

import Link from "../Link";
import IconLink from "../IconLink";

type NavMenuLinkProps = {
  to: string;
  label: string;
  children: React.ReactNode;
};

const NavMenuLink: React.FunctionComponent<NavMenuLinkProps> = ({
  to,
  label,
  children,
  ...rest
}) => {
  const router = useRouter();
  const isActive = router.asPath === to;

  return (
    <RadixLink active={isActive} asChild>
      <NextLink href={to} passHref {...rest}>
        {(children as string) ? (
          //@ts-ignore Not sure how to type this, as the props it's yelling
          //           about are being passed by the NextLink component 🤷‍♀️
          <Link>{children}</Link>
        ) : (
          //@ts-ignore Not sure how to type this, as the props it's yelling
          //           about are being passed by the NextLink component 🤷‍♀️
          <IconLink label={label}>{children}</IconLink>
        )}
      </NextLink>
    </RadixLink>
  );
};

export default NavMenuLink;
