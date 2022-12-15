---
title: Landmarks and where to put them
created: 2022-12-15
modified: 2022-12-15
---

{% unfurl "https://www.htmhell.dev/adventcalendar/2022/4/" %}

> Here's an overview of the landmark elements in HTML, their ARIA role and what they mean: 
> - `aside` (role: `complementary`) can be used to show content that is complementary to the main subject of the page. For example, links to related documents or meta info related to the main subject.
> - `footer` (role: `contentinfo`) is where you put all the information about a page. Typically that's things like copyright info, related links, the author
> - `form` (role: `form`) *can* be a landmark element if it has a accessible name (set with `aria-label`, `aria-labelledby` or `title` attributes)
> - `header` (role: `banner`) is where your page's "introduction" goes. Things like your logo, search and main navigation all go in here.
> - `main` (role: `main`) contains the main content or functionality of your page.
> - `nav` (role: `navigation`) is where you provide navigational links. They can be for your entire website (think your main menu), but also for your current page (think table of contents).
> - `section` (role: `region`) This is a "generic standalone section of a page". Essentially, if you have a part of the page that stands alone, try to go down this list and if none of them fit but it's still a separate part of the page, use a section. Like `form`s, it'll only be a landmark if it also has an accessible name.
> - There is still one more landmark that we need to discuss: the `search` landmark. All the landmarks above are HTML elements with a specific landmark role, but the `search` landmark role has no associated HTML element. It only exists in ARIA. As you might guess, the search landmark is used to indicate search functionality and practically, you'd add a `search` role to a `form` element to change it from a generic form to a search form.
