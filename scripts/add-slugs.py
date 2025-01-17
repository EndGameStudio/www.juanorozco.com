# load files from the content folder then read and update the frontmatter 
import os
import frontmatter
from slugify import slugify

directory_path = './content/blog/2024/'

for filename in os.listdir(directory_path):
    filepath = os.path.join(directory_path, filename)
    if os.path.isfile(filepath) and filepath.endswith('.md') and filepath.find('_index') == -1:
        post = frontmatter.load(filepath)
        print(filepath)
        post.metadata['slug'] = slugify(post.metadata['title']).lower()
        print(post.metadata['slug'])
        frontmatter.dump(post, filepath) 