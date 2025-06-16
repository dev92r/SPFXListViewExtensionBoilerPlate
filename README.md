# spfx-list-view-extension-boilerplate

## Summary

A SharePoint Framework ListView Command Set Extension that adds custom commands with custom Fluent UI SVG icons embedded as base64. This solution demonstrates how to enhance the SharePoint list or library experience with custom contextual commands.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Prerequisites

- Node.js v18.x
- SharePoint Online Developer Tenant
- VS Code or any preferred IDE
- Modern SharePoint List/Library where the command set will be deployed

## Minimal Path to Awesome

- Clone this repository:
- git clone https://github.com/your-repo/spfx-list-view-extension-boilerplate.git
- cd spfx-list-view-extension-boilerplate
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

This extension demonstrates:

Creating ListView Command Set extensions

Using base64-encoded custom Fluent UI SVG icons

Toggling visibility and behavior based on selected items

Deploying extensions to modern SharePoint sites

## Notes on Icons

Icons used in this solution were taken from the official Fluent UI SVG library and encoded in base64 format to be used directly in the SPFx manifest.json:

- Source of icons: Fluent UI System Icons on GitHub https://github.com/microsoft/fluentui-system-icons/tree/main/assets

- Base64 conversion tool used: https://www.base64-image.de/

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
