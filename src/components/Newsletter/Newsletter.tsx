/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { styled } from "../../../stitches.config";
import { Button } from "../Button";
import Link from "../Link";
import NextLink from "next/link";

const NewsletterForm = styled("form", {
  gridArea: "newsletter",
  fontSize: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "$size3",
  inlineSize: "fit-content",

  "@mobileLarge": {
    flexDirection: "row",
  },
});

const Heading = styled("h3", {
  fontSize: "$fontSize7",
});

const Label = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: "$size2",
  inlineSize: "100%",

  "& span": {
    lineHeight: 1,
  },
});

const Input = styled("input", {
  inlineSize: "100%",
  color: "$accentText",
  padding: "$size2 $size3",
  borderRadius: "calc($radius2 + 3px)",
  border: "2px solid",
  borderColor: "$accentBgActive",
  backgroundColor: "$accentBase",
  transition: "all 200ms ease-out",

  "&:hover, &:focus": {
    outline: "0px solid $accentLine",
    outlineOffset: "0px",
    borderColor: "$accentLine",
  },

  "&:focus-visible, &:active": {
    outlineOffset: "0px",
    outline: "2px solid $accentBorder",
    borderColor: "$accentBorder",
  },

  "&::placeholder": {
    color: "$accentText",
  },
});

const ButtonStyled = styled(Button, {
  backgroundColor: "$accentBase",
  color: "$accentText",
  border: "4px solid",
  outline: "0px solid",
  borderColor: "$accentBgActive",
  borderRadius: "calc($radius2 + 3px)",
  inlineSize: "100%",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: 1,
  paddingBlock: "$size2",

  "@motionOK": {
    transition: "all 200ms ease-in-out",
  },

  "&:hover, &:focus": {
    borderWidth: "2px",
    marginBlock: "2px",
    outlineColor: "$accentLine",
    borderColor: "$accentLine",
    transform: "scale(1.01)",
  },

  "&:active": {
    borderWidth: "2px",
    outlineColor: "$accentBorder",
    borderColor: "$accentBorder",
    transform: "scale(0.99)",
  },
});

const Disclaimer = styled("p", {
  fontSize: "$fontSize1",
  color: "$neutralBgHover",

  "& a": {
    color: "$neutralBgHover",
  },
});

const Reassurance = styled("p", {});

const Newsletter = () => {
  return (
    <NewsletterForm
      id="revue-form"
      name="revue-form"
      action="http://newsletter.ellyloel.com/add_subscriber"
      method="post"
    >
      <Heading>A newsletter that sparks joy</Heading>
      <p>
        Keep up to date with my{" "}
        <NextLink href="/digital-garden" passHref>
          <Link>digital garden</Link>
        </NextLink>
        , my{" "}
        <NextLink href="/blog" passHref>
          <Link>blog</Link>
        </NextLink>{" "}
        posts, and anything else I'm working on, as well as gain access to
        newsletter exclusive content.
      </p>
      <Reassurance>
        <strong>No spam</strong>, unsubscribe at <strong>any time</strong>.
      </Reassurance>
      <Label htmlFor="member_first_name">
        <span>Name</span>
        <Input
          id="member_first_name"
          name="member[first_name]"
          type="text"
          placeholder="Your name"
        />
      </Label>

      <Label htmlFor="member_email">
        <span>Email</span>
        <Input
          id="member_email"
          name="member[email]"
          type="email"
          placeholder="you@example.com"
          required
        />
      </Label>

      <ButtonStyled id="member_submit" name="member[subscribe]" type="submit">
        Subscribe
      </ButtonStyled>
      <Disclaimer>
        <em>
          By subscribing, you agree with Revue's{" "}
          <Link href="https://www.getrevue.co/terms" icon>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="https://www.getrevue.co/privacy" icon>
            Privacy Policy
          </Link>
          .
        </em>
      </Disclaimer>
    </NewsletterForm>
  );
};

export default Newsletter;
