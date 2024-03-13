import { useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {

	const shadowText = props.attributes.overrideShadowText
		? props.attributes.customShadowText 
		: props.attributes.content;

    return (
        <section { ...useBlockProps.save() } >
			<span className="textWrapper">
				<h2>{ props.attributes.content }</h2>
				{ props.attributes.showShadowText && (
					<span className="shadow-text">{ shadowText }</span>
				)}
			</span>
		</section>
    );
}