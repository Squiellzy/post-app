import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import './app.css';
import styled from "styled-components";

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;
// const StyledAppBlock = styled(AppBlock)`
//     background-color: grey;
// `
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "Going to learn React", important: true, like: false, id: 1},
                {label: "That is so good", important: false, like: false, id: 2},
                {label: "I need a break..." , important: false, like: false, id: 3}
            ],
            term: "",
            filter:"all"

        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.maxId = 4;
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }
    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return{
                data: newArr
            }
        });
    }
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr =[...data, newItem];
            return{
                data: newArr
            }
        })
    }
    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return{
                data: newArr
            }
        })
    }
    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return{
                data: newArr
            }
        })
    }
    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        };
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }
    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }
    onUpdateSearch(term) {
        this.setState({term})
    }
    onFilterSelect(filter) {
        this.setState({filter})
    }
    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPost = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPost={allPost}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}