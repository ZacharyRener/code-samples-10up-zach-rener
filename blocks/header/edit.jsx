import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    RichText,
    InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl, TextControl } from "@wordpress/components";
import "./editor.scss";

export default function edit(props) {
    const { attributes, setAttributes } = props;

    const shadowText = attributes.overrideShadowText
        ? attributes.customShadowText
        : attributes.content;

    const inspectorControls = (
        <InspectorControls>
            <PanelBody title={__("Settings", "")}>
                <ToggleControl
                    checked={!!attributes.showShadowText}
                    label={__("Show shadow text")}
                    onChange={() =>
                        setAttributes({
                            showShadowText: !attributes.showShadowText,
                        })
                    }
                />
                {attributes.showShadowText && (
                    <ToggleControl
                        checked={!!attributes.overrideShadowText}
                        label={__("Override shadow text")}
                        onChange={() =>
                            setAttributes({
                                overrideShadowText:
                                    !attributes.overrideShadowText,
                            })
                        }
                    />
                )}
                {attributes.showShadowText && attributes.overrideShadowText && (
                    <TextControl
                        label={__("Custom shadow text")}
                        value={attributes.customShadowText || ""}
                        onChange={(value) =>
                            setAttributes({ customShadowText: value })
                        }
                    />
                )}
            </PanelBody>
        </InspectorControls>
    );

    return (
        <>
            {inspectorControls}
            <section {...useBlockProps()}>
                <span className="textWrapper">
                    <RichText
                        tagName="h2"
                        value={attributes.content}
                        allowedFormats={[]}
                        onChange={(newContent) =>
                            setAttributes({ content: newContent })
                        }
                        placeholder={__("Enter header...", "text-domain")}
                    />
                    {attributes.showShadowText && (
                        <span className="shadow-text">{shadowText}</span>
                    )}
                </span>
            </section>
        </>
    );
}
