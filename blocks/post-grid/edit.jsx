import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from "@wordpress/block-editor";
import {
    PanelBody,
    ToggleControl,
    RangeControl,
    SelectControl,
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import "./editor.scss";

const EditComponent = withSelect((select, props) => {
    const {
        attributes: { postCount, postType },
    } = props;
    const { getEntityRecords } = select("core");

    const latestPosts = getEntityRecords("postType", postType, {
        per_page: postCount,
    });

    return {
        posts: latestPosts,
    };
})((props) => {
    const { attributes, setAttributes, posts } = props;

    const inspectorControls = (
        <InspectorControls>
            <PanelBody title={__("Post Grid Settings", "post-grid")}>
                <RangeControl
                    label={__("Number of posts", "post-grid")}
                    value={attributes.postCount}
                    onChange={(value) => setAttributes({ postCount: value })}
                    min={1}
                    max={4}
                />
                <SelectControl
                    label={__("Select Post Type", "post-grid")}
                    value={attributes.postType}
                    onChange={(value) => setAttributes({ postType: value })}
                    options={[
                        { label: "Post", value: "post" },
                        { label: "Page", value: "page" },
                        // Add more post types as needed
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    );

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString)
            .toLocaleDateString("en-US", options)
            .toUpperCase();
    }

    function PostItem({ post }) {
        const [featuredImageUrl, setFeaturedImageUrl] = useState(null);

        useEffect(() => {
            const fetchImage = async () => {
                if (post.featured_media) {
                    const response = await fetch(
                        `${window.location.origin}/wp-json/wp/v2/media/${post.featured_media}`
                    );
                    const data = await response.json();
                    setFeaturedImageUrl(data.source_url);
                }
            };
            fetchImage();
        }, [post.featured_media]);

        return (
            <div key={post.id} className="post">
                {featuredImageUrl && (
                    <img src={featuredImageUrl} alt={post.title.rendered} />
                )}
                <div className="date">{formatDate(post.date)}</div>
                <h4>{post.title.rendered}</h4>
                <div
                    className="excerpt"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
            </div>
        );
    }

    const postList =
        posts && posts.map((post) => <PostItem key={post.id} post={post} />);

    return (
        <>
            {inspectorControls}
            <section {...useBlockProps()}>
                <div class="title">
                    <RichText
                        tagName="h3"
                        value={attributes.title}
                        allowedFormats={[]}
                        onChange={(newTitle) =>
                            setAttributes({ title: newTitle })
                        }
                        placeholder={__("Enter title...", "text-domain")}
                    />
                </div>
                <div className="posts">{postList}</div>
            </section>
        </>
    );
});

export default EditComponent;
