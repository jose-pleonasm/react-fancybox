import React, { Component } from 'react'

const closeImg = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 455.992 455.992" style="enable-background:new 0 0 455.992 455.992;" xml:space="preserve">
	<g>
		<g>
			<g>
				<g>
					<path style="fill:#010002;" d="M227.996,0C102.081,0,0,102.081,0,227.996c0,125.945,102.081,227.996,227.996,227.996
						c125.945,0,227.996-102.051,227.996-227.996C455.992,102.081,353.941,0,227.996,0z M227.996,425.593
						c-108.952,0-197.597-88.645-197.597-197.597S119.044,30.399,227.996,30.399s197.597,88.645,197.597,197.597
						S336.948,425.593,227.996,425.593z"/>
					<path style="fill:#010002;" d="M312.142,122.358l-83.538,83.568l-74.965-83.568c-5.928-5.928-15.565-5.928-21.492,0
						c-5.928,5.928-5.928,15.565,0,21.492l74.965,83.568l-84.723,84.723c-5.928,5.928-5.928,15.595,0,21.492
						c5.928,5.928,15.565,5.928,21.492,0l83.568-83.538l74.965,83.538c5.897,5.928,15.565,5.928,21.462,0
						c5.928-5.898,5.928-15.565,0-21.492l-74.995-83.538l84.723-84.754c5.928-5.928,5.928-15.565,0-21.492
						C327.676,116.43,318.07,116.43,312.142,122.358z"/>
				</g>
			</g>
		</g>
	</g>
</svg>`;
const closeImgSrc = `data:image/svg+xml;utf8,${closeImg}`;


/**
 * @typedef {Object} Props
 * @property {string} thumbnail
 * @property {string} image
 * @property {(string|number)} defaultThumbnailWidth
 * @property {(string|number)} defaultThumbnailHeight
 * @property {string} caption
 * @property {string} animation
 * @property {number} animationTime
 * @property {Function} onOpen
 * @property {Function} onClose
 * @property {boolean} showCloseBtn
 * @property {string} closeImgSrc
 */

export const defaultProps = {
	thumbnail: '',
	image: '',
	defaultThumbnailWidth: '100%',
	defaultThumbnailHeight: 'auto',
	caption: '',
	animation: 'fade',
	onOpen: () => {},
	onClose: () => {},
	showCloseBtn: true,
	closeImgSrc: closeImgSrc,
};

export class Fancybox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
		}
	}

	show = () => {
		const { onOpen = defaultProps.onOpen } = this.props;

		this.setState({
			show: true,
		})
		onOpen()
	}

	handleClickThumbnail = (event) => {
		event.preventDefault()
		this.show()
	}

	handleClickBox = (event) => {
		if (this.box.contains(event.target)) {
			return
		}
		this.close()
	}

	close = () => {
		const { onClose = defaultProps.onClose } = this.props;

		this.setState({
			show: false
		})
		onClose()
	}

	renderThumbnail = () => {
		const {
			image,
			thumbnail = defaultProps.thumbnail,
			defaultThumbnailWidth = defaultProps.defaultThumbnailWidth,
			defaultThumbnailHeight = defaultProps.defaultThumbnailHeight,
		} = this.props;

		return (
			<a onClick={this.handleClickThumbnail} href={image} className="thumbnail">
				{thumbnail ? (
					<img src={thumbnail} alt="thumbnail" />
				) : (
					<img
						style={{width: defaultThumbnailWidth, height: defaultThumbnailHeight, objectFit: 'cover'}}
						src={image}
						alt="thumbnail"
					/>
				)}
			</a>
		)
	}

	render () {
		const {
			image,
			caption = defaultProps.caption,
			animation = defaultProps.animation,
			closeImgSrc = defaultProps.closeImgSrc,
			showCloseBtn = defaultProps.showCloseBtn,
		} = this.props;

		return (
			<div className="react-fancybox">
				{this.renderThumbnail()}
				{this.state.show
					? (
						<div onClick={this.handleClickBox} className="box">
							<div ref={box => this.box = box} className="image-box">
								{showCloseBtn && (
									<button className="close-btn" onClick={this.close}>
										<img src={closeImgSrc} alt="close" />
									</button>
								)}
								<img src={image} alt="original" />
								{caption &&
									<div className="caption">{caption}</div>
								}
							</div>
						</div>

					) : null}
			<style jsx>{`
				.box {
					position: fixed;
					background-color: rgba(0, 0, 0, 0.4);
					top: 0;
					right: 0;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					z-index: 1;
				}

				.thumbnail img {
					max-width: 600px;
				}

				.box .image-box {
					padding: 10px;
					background-color: white;
					border-radius: 4px;
					position: relative;
				}

				.box .image-box .caption {
					text-align: center;
					font-size: 14px;
					margin-top: 7px;
				}

				.fade-enter {
					animation: fadein 600ms;
				}

				.fade-leave {
					animation: fadeout 600ms;
				}

				.close-btn {
					display: inline-block;
					margin: 0;
					padding: 0;
					background: none;
					border: 0;
					text-decoration: none;
					cursor: pointer;
					background-color: white;
					width: 25px;
					border-radius: 50%;
					height: 25px;
					position: absolute;
					right: -13px;
					top: -13px;
				}

				@keyframes fadein {
					from { opacity: 0; }
					to { opacity: 1; }
				}

				@keyframes fadeout {
					from { opacity: 1; }
					to { opacity: 0; }
				}
			`}</style>
			</div>
		)
	}
}

export default Fancybox;
