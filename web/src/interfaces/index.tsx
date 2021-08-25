export interface RouteConfig {
  path: string;
  component: () => JSX.Element;
  name?: string;
  logo: JSX.Element;
}

export interface PostCardData {
  id: string;
  title: string;
  content: string;
  category: string;
  avatar: string;
  author: string;
  createdAt: string | Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface PostsWithAuthor {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    profile: {
      avatar: string;
    };
  };
  categories: {
    category: Category;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GlobalContextProps {
  loginModal: boolean;
  toggleLoginModal: () => void;
}
