import React from 'react'
/** Amplify Auth */
import { Auth } from 'aws-amplify'
/** Themes */
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import {
    Heading,
    Button,
    Box,
    Card,
    Text
} from 'rebass'
/** Axios */
import axios from 'axios'

class Create extends React.Component {
    state = {
        user: {},
        response: {},
        show: false
    }

    componentDidMount = async () => {
        this.setState({
            user: await Auth.currentAuthenticatedUser()
        })
    }

    handleSubmit = () => {
        axios.get('http://3.222.166.83/rewards/history/'
        +this.state.user.username+'/'
        +'user1')
        .then((res)=>{
            this.setState({response: res.data,show: true})
        })
        .catch((error)=>{
            alert(JSON.stringify(error))
        })
    }

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Heading fontSize={[3, 4, 5]}> Get Rewards History </Heading>
                    <Box
                        py={3}>
                        <Box px={2} ml='auto'>
                            <Button onClick={this.handleSubmit}>
                                Read
                            </Button>
                        </Box>
                    </Box>
                    {this.state.show &&
                    this.state.response.map(rewards => (
                        <Card key={rewards.id}>
                            <Heading> TxId: {rewards.TxId}</Heading>
                            <Text> Account level: {rewards.Value.level}</Text>
                            <Text> Account tokens: {rewards.Value.tokens}</Text>
                        </Card>
                    ))}
                </ThemeProvider>
            </>
        )
    }
}

export default Create