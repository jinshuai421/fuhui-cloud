export const renderLab = function (this: any) {
  if (this.renderLabel) {
    return this.renderLabel(this.label)
  }
  if (!this.label) return ''
  return <div class={['font--t9 text-black']}>{this.label}</div>
}
