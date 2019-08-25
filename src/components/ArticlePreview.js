import { Link } from "react-router";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	...state.article,
});

const mapDispatchToProps = (dispatch) => ({
	like: (payload) => dispatch({ type: "LIKE", payload }),
	dislike: (payload) => dispatch({ type: "DISLIKE", payload }),
});

class ArticlePreview extends React.Component {
	constructor() {
		super();
		this.toggleLike = (ev) => {
			ev.preventDefault();
			if (this.props.article.favorited) {
				const payload = agent.Articles.dislike(this.props.article.slug);
				return this.props.dislike(payload);
			} else {
				const payload = agent.Articles.like(this.props.article.slug);
				return this.props.like(payload);
			}
		};
	}

	render() {
		const article = this.props.article;
		let favoriteButton = (
			<button
				className="btn btn-sm btn-outline-primary"
				onClick={this.toggleLike}
			>
				<i className="ion-heart">{article.favoritesCount}</i>
			</button>
		);
		if (article.favorited) {
			const st = {
				color: "white",
				backgroundColor: "green",
			};
			favoriteButton = (
				<button
					style={st}
					className="btn btn-sm btn-outline-primary"
					onClick={this.toggleLike}
				>
					<i className="ion-heart">{article.favoritesCount}</i>
				</button>
			);
		}
		return (
			<div className="article-preview">
				<div className="article-meta">
					<a>
						<img src={article.author.image} alt="author" />
					</a>

					<div className="info">
						<a className="author">{article.author.username}</a>
						<span className="date">
							{new Date(article.createdAt).toDateString()}
						</span>
					</div>

					<div className="pull-xs-right">{favoriteButton}</div>
				</div>

				<Link to={`article/${article.slug}`} className="preview-link">
					<h1>{article.title}</h1>
					<p>{article.description}</p>
					<span>Read more...</span>
					<ul className="tag-list">
						{article.tagList.map((tag) => {
							return (
								<li className="tag-default tag-pill tag-outline" key={tag}>
									{tag}
								</li>
							);
						})}
					</ul>
				</Link>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticlePreview);
