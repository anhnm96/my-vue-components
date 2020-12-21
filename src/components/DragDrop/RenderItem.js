export default {
    props: {
        render: {
            type: Function,
            required: true
        },
        value: String
    },
    render() {
        return (
            <div>
                {this.$props.render(this)}
            </div>
        )
    }
}