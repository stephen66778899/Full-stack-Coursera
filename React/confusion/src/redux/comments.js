import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            // state here is the COMMENTS object that we imported, id is created (no need to declare beforehand)
            // since id goes from 0, 1, 2, 3 ... we simply create the id attribute assign length to it here
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
          return state;
      }
};