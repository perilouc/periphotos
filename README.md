# periphotos.com

Photography site of Pericles Loucopoulos. Built with [Eleventy](https://www.11ty.dev/) and published by GitHub Pages: every change pushed to `main` rebuilds the site automatically (see the Actions tab).

## Where things live

| What | File |
|---|---|
| Name, statement, home-page photo, email, social links | `src/_data/site.json` |
| One file per gallery (title, order, intro, cover, photo list) | `src/galleries/*.md` |
| Photographs | `src/images/<gallery-name>/` |
| Journal entries (one file each; text below the `---` lines) | `src/journal/*.md` |
| About & contact page | `src/about.njk` |
| Colours, type and layout | `src/assets/css/site.css` |

## Editing a gallery

Each gallery file has a `photos:` list. The page is laid out from that list, top to bottom:

```yaml
photos:
  - image: /images/travels-in-india/boatman.jpg
    alt: A short plain description (read aloud by screen readers)
    caption: Varanasi, 2012        # shown under the photo; leave "" for none
    layout: full                   # full | pair | centred
```

- **Add a photo:** put the file in `src/images/<gallery>/` and add an entry to the list.
- **Delete a photo:** remove its entry (and the file, if no longer needed).
- **Reorder:** move entries up or down.
- **Layout:** two consecutive `pair` photos sit side by side; `full` spans the page; `centred` is narrower with space around it.
- **Order of galleries** on the home page: the `order:` number in each file. **Cover:** the `cover:` image.

## Moving to periphotos.com

Add a file `src/CNAME` containing `www.periphotos.com`, set the custom domain in Settings → Pages, and add the DNS records at Squarespace. The build then serves the site from the root of the domain.
