# Juan Orozco dot com

## Installing

### Prerequisites

- Install Homebrew
- Install git
- `brew install hugo`
- Clone repo
- Add submodule theme: `git submodule update --init`

### Run

Start a dev server: `hugo server`

Run a build `hugo`

## Editing

Linking to other pages:

- This is a reference link: `[July 1st, 2023]({{< ref "/photography/release-2023-07-02" >}})` (this is part of Hugo)
- Or a summary: `{{% summary "/photography/release-2023-07-02" %}}` (this is a shortcode included with Axiom)
