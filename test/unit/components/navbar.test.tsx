import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import React from 'react';
import { Application } from "../../../src/client/Application";
import __Providers from "../__Providers";
import { getPath } from "../helpers";

const basename = '/hw/store';

describe("Navbar", () => {
  it("существует один и только один на странице", () => {
    const app = <__Providers basename={basename}><Application /></__Providers>
    const { container } = render(app)

    const navElements = container.getElementsByClassName("navbar")

    expect(navElements.length).toBe(1)
  })

  it("отображает ссылки на страницы магазина, а также ссылку на корзину в верном порядке", () => {
    const app = <__Providers basename={basename}><Application /></__Providers>
    const { container } = render(app)

    const nav = container.getElementsByClassName("navbar")[0]

    const navContainer = nav.children[0]

    const otherLinksContainer = navContainer.getElementsByClassName("Application-Menu")[0]
    const otherLinks = otherLinksContainer.children[0].children
    expect(otherLinks.length).toBe(4)
    expect(otherLinks[0].getAttribute("href")).toBe(basename + "/catalog")
    expect(otherLinks[1].getAttribute("href")).toBe(basename + "/delivery")
    expect(otherLinks[2].getAttribute("href")).toBe(basename + "/contacts")
    expect(otherLinks[3].getAttribute("href")).toBe(basename + "/cart")
  })

  it("отображает название магазина как ссылку на главную страницу", () => {
    const app = <__Providers basename={basename}><Application /></__Providers>
    const { container } = render(app)

    const nav = container.getElementsByClassName("navbar")[0]

    const navContainer = nav.children[0]

    const homeLink = navContainer.getElementsByClassName("navbar-brand")[0]
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute("href")).toBe(basename + "/")
  })
})