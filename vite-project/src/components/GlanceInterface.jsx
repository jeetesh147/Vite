const GlanceCombinedInterface = () => {
    // State variables
    let isAdmin = false;
    let activePage = 'dashboard';
    let posts = [
      { id: 1, title: 'Post Title 1', description: 'Short description of the post goes here. This can be an excerpt of the content...', likes: 15, comments: 5 },
      { id: 2, title: 'Post Title 2', description: 'Another short description of a different post goes here...', likes: 8, comments: 3 },
    ];
  
    // Event handlers
    const toggleAdminMode = () => {
      isAdmin = !isAdmin;
      activePage = 'dashboard';
      renderUI();
    };
  
    const addNewPost = () => {
      const newPost = {
        id: posts.length + 1,
        title: `New Post ${posts.length + 1}`,
        description: 'Add your post description here...',
        likes: 0,
        comments: 0,
      };
      posts.push(newPost);
      renderUI();
    };
  
    const deletePost = (id) => {
      posts = posts.filter(post => post.id !== id);
      renderUI();
    };
  
    const likePost = (id) => {
      posts = posts.map(post => 
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      );
      renderUI();
    };
  
    const setActivePage = (page) => {
      activePage = page;
      renderUI();
    };
  
    // Render functions
    const renderNavLink = (page, icon, label) => `
      <a
        href="#"
        class="flex items-center mt-2 py-2 px-6 rounded-lg transition-colors duration-200 ${activePage === page ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
        onclick="setActivePage('${page}'); return false;"
      >
        ${icon}
        <span class="ml-3">${label}</span>
      </a>
    `;
  
    const renderPostActions = (post) => {
      if (isAdmin) {
        return `
          <button class="mr-2 p-2 rounded-full text-green-600 hover:bg-green-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button onclick="deletePost(${post.id})" class="p-2 rounded-full text-destructive hover:bg-destructive/10 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        `;
      } else {
        return `
          <button onclick="likePost(${post.id})" class="mr-2 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            ${post.likes}
          </button>
          <span class="inline-flex items-center text-sm font-medium text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
            </svg>
            ${post.comments}
          </span>
        `;
      }
    };
  
    const renderPosts = () => `
      <ul class="divide-y divide-border">
        ${posts.map(post => `
          <li key="${post.id}" class="py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-foreground">${post.title}</h3>
              <div class="flex items-center space-x-2">
                ${renderPostActions(post)}
              </div>
            </div>
            <p class="mt-1 text-sm text-muted-foreground">${post.description}</p>
          </li>
        `).join('')}
      </ul>
    `;
  
    const renderContent = () => {
      switch (activePage) {
        case 'dashboard':
          return `
            <h2 class="text-3xl font-bold text-foreground mb-6">Dashboard Overview</h2>
            ${isAdmin ? `
              <div class="bg-card text-card-foreground shadow-lg rounded-lg p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4">Quick Stats</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-background p-4 rounded-lg shadow-md">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-medium text-muted-foreground">Total Posts</h4>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="text-2xl font-bold text-foreground mt-2">${posts.length}</p>
                  </div>
                  <div class="bg-background p-4 rounded-lg shadow-md">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-medium text-muted-foreground">Total Likes</h4>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </div>
                    <p class="text-2xl font-bold text-foreground mt-2">${posts.reduce((sum, post) => sum + post.likes, 0)}</p>
                  </div>
                  <div class="bg-background p-4 rounded-lg shadow-md">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-medium text-muted-foreground">Total Comments</h4>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="text-2xl font-bold text-foreground mt-2">${posts.reduce((sum, post) => sum + post.comments, 0)}</p>
                  </div>
                </div>
              </div>
            ` : ''}
            <div class="bg-card text-card-foreground shadow-lg rounded-lg">
              ${renderPosts()}
            </div>
          `;
        case 'posts':
          return `
            <h2 class="text-3xl font-bold text-foreground mb-6">Manage Posts</h2>
            ${isAdmin ? `
              <button onclick="addNewPost()" class="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                Add New Post
              </button>
            ` : ''}
            <div class="bg-card text-card-foreground shadow-lg rounded-lg">
              ${renderPosts()}
            </div>
          `;
        case 'categories':
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Manage Categories</h2>';
        case 'users':
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Manage Users</h2>';
        case 'analytics':
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Analytics Dashboard</h2>';
        case 'settings':
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Settings</h2>';
        case 'search':
          return `
            <h2 class="text-3xl font-bold text-foreground mb-6">Search Content</h2>
            <div class="max-w-xl">
              <input
                type="text"
                placeholder="Search posts..."
                class="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          `;
        case 'bookmarks':
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Your Bookmarks</h2>';
        case 'profile':
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Your Profile</h2>';
        default:
          return '<h2 class="text-3xl font-bold text-foreground mb-6">Welcome to GLANCE</h2>';
      }
    };
  
    const renderUI = () => {
      document.body.innerHTML = `
        <div class="min-h-screen bg-background text-foreground">
          <nav class="bg-card text-card-foreground shadow-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between h-16">
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-primary">GLANCE</span>
                </div>
                <div class="flex items-center">
                  <button onclick="toggleAdminMode()" class="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200 mr-4">
                    ${isAdmin ? 'Switch to User Mode' : 'Switch to Admin Mode'}
                  </button>
                  <div class="relative">
                    <button class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out">
                      <img class="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          
          </nav>
  
          <div class="flex">
            <div class="w-64 bg-card text-card-foreground h-screen shadow-lg">
              <nav class="mt-5 px-2">
                ${renderNavLink('dashboard', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>', 'Dashboard')}
                ${renderNavLink('posts', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>', 'Posts')}
                ${isAdmin ? `
                  ${renderNavLink('categories', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>', 'Categories')}
                  ${renderNavLink('users', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>', 'Users')}
                  ${renderNavLink('analytics', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>', 'Analytics')}
                  ${renderNavLink('settings', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>', 'Settings')}
                ` : `
                  ${renderNavLink('search', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>', 'Search')}
                  ${renderNavLink('bookmarks', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>', 'Bookmarks')}
                  ${renderNavLink('profile', '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>', 'Profile')}
                `}
              </nav>
            </div>
  
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-background">
              <div class="container mx-auto px-6 py-8">
                ${renderContent()}
              </div>
            </main>
          </div>
  
          <footer class="bg-card text-card-foreground">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p class="text-center text-sm text-muted-foreground">© 2024 GLANCE. All rights reserved.</p>
            </div>
          </footer>
        </div>
      `;
    };
  
    // Initial render
    renderUI();
  
    // Expose functions to the global scope
    window.toggleAdminMode = toggleAdminMode;
    window.addNewPost = addNewPost;
    window.deletePost = deletePost;
    window.likePost = likePost;
    window.setActivePage = setActivePage;
  
    // Return an empty object as this is not a React component
    return {};
  };
  
  // Export the function
  export default GlanceCombinedInterface;