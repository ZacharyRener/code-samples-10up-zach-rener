<?php
$post_count = $attributes['postCount'] ?? 3;
$post_type = $attributes['postType'] ?? 'post';
$title = $attributes['title'] ?? 'The Latest';

$args = array(
    'post_type'      => $post_type,
    'posts_per_page' => $post_count,
);

$posts_query = new WP_Query($args);

if ($posts_query->have_posts()) : ?>
    <section <?php print get_block_wrapper_attributes(); ?> >
		<div class="title"><h3><?php print $title; ?></h3></div>
        <div class="posts">
            <?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
                <div class="post">
					<?php the_post_thumbnail(); ?>
					<div class="date"><?php the_date(); ?></div>
                    <h4><?php the_title(); ?></h4>
					<div class="excerpt"><?php the_excerpt(); ?></div>
                </div>
            <?php endwhile; ?>
        </div>
    </section>
<?php endif; wp_reset_postdata(); ?>
