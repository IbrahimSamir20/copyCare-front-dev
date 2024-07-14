// features/abilities/abilitiesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/config';
import { AppAbility } from '../const/permession.type';

interface AbilitiesState {
  abilities?: AppAbility;
}

const initialState: AbilitiesState = {
  abilities: undefined,
};

const abilitiesSlice = createSlice({
  name: 'abilities',
  initialState,
  reducers: {
    setAbilities(state, action: PayloadAction<AppAbility>) {
      state.abilities = action.payload;
    },
    removeAbilities: () => initialState,
  },
});

export const { setAbilities, removeAbilities } = abilitiesSlice.actions;

export const selectAbilities = (state: RootState) => state.abilities.abilities;

export default abilitiesSlice.reducer;
