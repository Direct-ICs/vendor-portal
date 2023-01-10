import React, { useEffect, useState } from 'react';
import auth from '../../utils/auth';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function CommentSection () {
    const [comment, setComment] = useState("");
    const [current, setCurrent] = useState([]);
    const [loading, setLoading] = useState(false);

    let commentsLoaded = false;
    let comments = undefined;
    const whatId = window.location.pathname.split('/')[2];
    const type = window.location.pathname.split('/')[1];

    async function fetchComments () {
        if (comments)
            return comments;
        const response = await fetch("/api/comments/"+ type +"/" + whatId, { method: "get" });
        const data = await response.json();
        if (response.ok)
        {
            commentsLoaded = true;
            comments = data.data;
            return data.data;
        }
    }

    useEffect(() => {
        fetchComments();
        setCurrent(comments);
    }, [commentsLoaded === true]);

    const updateComment = (e) => {
        const text = e.target.value;
        setComment(text);
    }
    const submitComment = () => {
        // submit comment
        setLoading(true);
        // get information to add to the page
        const date = new Date();
        const commentToAppend = {
            commented_by: auth.getProfile().account_name,
            description: comment,
            time: (((date.getHours() < 10 || date.getHours() > 12) && date.getHours() < 22)
                    ?"0":"") + (date.getHours() > 12 
                                ? date.getHours()-12 : date.getHours()) +":"+ (
                                    (date.getMinutes() < 10)
                                    ?"0":"") + date.getMinutes() + " " + (
                                        (date.getHours() < 12 ? "AM" : "PM")),
            date: date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate(),
            comment_id: date.getTime()
        }

        // send comment to books
        fetch("/api/comments/" + whatId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: comment
            }),
            params: JSON.stringify({
                type
            })
        })
        .then((response) => {
            // on positive result, add to the page and clear the form
            setCurrent([commentToAppend, ...current]);
            setComment('');
            setLoading(false);
        })
        .catch((err) => {
            toast.error("Could not submit comment. Please check your internet connection or try again later.", {
                closeOnClick: true,
                pauseOnHover: false,
            });
            setLoading(false);
        });
    }
    return (
        <div className='comment-container'>
            <div className="media-body">
                <div className="form-group">
                    <textarea 
                        rows="4" 
                        placeholder="Enter comments"
                        value={comment}
                        id="c-box"
                        onChange={updateComment}
                        className="comment-box" />
                </div>
                <button 
                    id="submit-comment-btn" 
                    className="btn"
                    disabled={loading}
                    onClick={submitComment}
                    type="submit">
                        Add Comment
                </button>
            </div>
            <div className="comment-body">
                {(current && current.length > 0) && current.map((comment) => (
                    <div key={comment.comment_id} className={`comment ${comment.commented_by === "DCI Admin" ? "vendor" : "dci"}`}>
                        <div className="from">{comment.commented_by === "DCI Admin" ? auth.getProfile().account_name : "Direct Components"}</div>
                        <div className="content">{comment.description}</div>
                        <div className="footer"><span>{comment.time}</span> <span>{comment.date}</span></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;