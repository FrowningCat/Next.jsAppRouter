import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { Element, Node } from 'hast';

function myRemarkPlugin() {
    return function (tree) {
        visit(tree, function (node: Node | any) {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                const data = node.data || (node.data = {});
                const hast = h(node.name, node.attributes || {});

                data.hName = hast.tagName;
                data.hProperties = hast.properties;
            }
        });
    };
}

const components = {
    h1: (props) => (
        <h1 {...props} className="large-text">
            {props.children}
        </h1>
    ),
};

const options = {
    mdxOptions: {
        remarkPlugins: [remarkDirective, myRemarkPlugin],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
};

export function CustomMDX(props: MDXRemoteProps) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
            options={options}
        />
    );
}
