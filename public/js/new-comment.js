const newComHandler = async(event) => {
    event.preventDefault();
    const com_content = document.querySelector('#com-content').value.trim();
    const user_id = document.querySelector('#com-user-id').value.trim();
    const post_id = document.querySelector('#post-id').value.trim();

    if (com_content) {
        const response = await fetch(`/api/comment/new`, {
            method: 'POST',
            body: JSON.stringify({ com_content, user_id, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create post');
        }
    }
};


document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComHandler);