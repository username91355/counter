const SET_CURRENT_VALUE = 'counter/counter-reducer/SET_CURRENT_VALUE'
const SET_MAX_COUNT_VALUE = 'counter/counter-reducer/MAX_COUNT_VALUE'
const SET_START_COUNT_VALUE = 'counter/counter-reducer/SET_START_COUNT_VALUE'
const SET_RESET_BUTTON_DISABLED = 'counter/counter-reducer/SET_RESET_BUTTON_DISABLED'
const SET_COUNT_BUTTON_DISABLED = 'counter/counter-reducer/SET_COUNT_BUTTON_DISABLED'
const SET_ERROR = 'counter/counter-reducer/ERROR'

const initialState = {
    currentValue: null,
    maxCountValue: 0,
    startCountValue: 0,
    resetButtonDisabled: true,
    countButtonDisabled: false,
    error: null
}

type InitialStateType = {
    currentValue: CurrentValueType
    maxCountValue: number
    startCountValue: number
    resetButtonDisabled: boolean
    countButtonDisabled: boolean
    error: ErrorType
}

export type CurrentValueType = null | number
export type ErrorType = string | null

type ActionsTypes =
    SetCurrentValueType
    | MaxCountValueType
    | SetStartCountValueType
    | SetResetButtonDisabledType
    | CountButtonDisabledType
    | SetErrorType
type SetCurrentValueType = ReturnType<typeof setCurrentValue>
type MaxCountValueType = ReturnType<typeof setMaxCountValue>
type SetStartCountValueType = ReturnType<typeof setStartCountValue>
type SetResetButtonDisabledType = ReturnType<typeof setResetButtonDisabled>
type CountButtonDisabledType = ReturnType<typeof setCountButtonDisabled>
type SetErrorType = ReturnType<typeof setError>

export const counterReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SET_CURRENT_VALUE: {
            return {
                ...state,
                currentValue: action.value
            }
        }

        case SET_MAX_COUNT_VALUE: {
            return {
                ...state,
                maxCountValue: action.value
            }
        }

        case SET_START_COUNT_VALUE: {
            return {
                ...state,
                startCountValue: action.value
            }
        }

        case SET_RESET_BUTTON_DISABLED: {
            return {
                ...state,
                resetButtonDisabled: action.value
            }
        }

        case SET_COUNT_BUTTON_DISABLED: {
            return {
                ...state,
                countButtonDisabled: action.value
            }
        }

        case SET_ERROR: {
            return {
                ...state,
                error: action.value
            }
        }

        default:
            return state
    }
}

export const setCurrentValue = (value: CurrentValueType) => ({type: SET_CURRENT_VALUE, value} as const)
export const setMaxCountValue = (value: number) => ({type: SET_MAX_COUNT_VALUE, value} as const)
export const setStartCountValue = (value: number) => ({type: SET_START_COUNT_VALUE, value} as const)
export const setResetButtonDisabled = (value: boolean) => ({type: SET_RESET_BUTTON_DISABLED, value} as const)
export const setCountButtonDisabled = (value: boolean) => ({type: SET_COUNT_BUTTON_DISABLED, value} as const)
export const setError = (value: ErrorType) => ({type: SET_ERROR, value} as const)