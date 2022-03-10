const editFormHandler = async(event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const id = document.querySelector('#post-id').value.trim();

    if (title && content) {
        const response = await fetch(`/api/dashboard/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};




const delButtonHandler = async(event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);
document
    .querySelector('.edit-post-form')
    .addEventListener('click', delButtonHandler);